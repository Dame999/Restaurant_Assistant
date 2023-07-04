package com.blankfactor.ra.service.impl;

import com.blankfactor.ra.model.*;
import com.blankfactor.ra.repository.AppTableRepository;
import com.blankfactor.ra.repository.UserTableRepository;
import com.blankfactor.ra.repository.VirtualTableRepository;
import com.blankfactor.ra.service.SectionService;
import com.blankfactor.ra.service.UserTableService;
import com.blankfactor.ra.service.VirtualTableService;
import com.blankfactor.ra.service.WaiterSectionService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@Data
public class UserTableServiceImpl implements UserTableService {
    private final VirtualTableRepository virtualTableRepository;
    private final UserTableRepository userTableRepository;
    private final AppTableRepository appTableRepository;
    private final WaiterSectionService waiterSectionService;
    private final SectionService sectionService;
    private final VirtualTableService virtualTableService;

    @Override
    public void createUserTable(AppTable appTable, AppUser user) {
        List<Section> sections = sectionService.getSectionsForTable(appTable);
        String waiterIds = waiterSectionService.getWaitersFromSections(sections);


        if (appTable.isVirtualTable()) {
            VirtualTable virtualTable = virtualTableService.getVirtualTableByAppTableNumber(appTable.getRestaurant().getId(), appTable.getTableNumber());

            if (!isAppUserSeated(user, virtualTable)) {
                createUserTableRecord(user, waiterIds, null, virtualTable);
            }

        } else {

            if (!isAppUserSeated(user, appTable)) {
                createUserTableRecord(user, waiterIds, appTable, null);
            }
        }
    }

    public void createUserTableRecord(AppUser user, String waiterIds, AppTable appTable, VirtualTable virtualTable) {
        UserTable userTable = UserTable.builder()
                .appUser(user)
                .waiterIds(waiterIds)
                .appTable(appTable)
                .virtualTable(virtualTable)
                .startTime(new Timestamp(System.currentTimeMillis()))
                .build();

        if (appTable != null) {
            appTable.setOccupied(true);
            appTableRepository.save(appTable);
        } else {
            virtualTable.setOccupied(true);
            virtualTableRepository.save(virtualTable);
        }
        userTableRepository.save(userTable);
    }

    public boolean isAppUserSeated(AppUser user, AppTable appTable) {
        UserTable userTable = userTableRepository.findByAppUserAndAppTableAndEndTimeIsNull(user, appTable).orElse(null);
        return userTable != null;
    }

    public boolean isAppUserSeated(AppUser user, VirtualTable virtualTable) {
        UserTable userTable = userTableRepository.findByAppUserAndVirtualTableAndEndTimeIsNull(user, virtualTable).orElse(null);
        return userTable != null;
    }
}
