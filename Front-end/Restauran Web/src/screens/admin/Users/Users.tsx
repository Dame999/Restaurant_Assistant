import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./users.module.css";
import gridColumns from "./DataGrid";
import AddUser from "./AddUser";
import rows from "./data";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

const Users = (): JSX.Element => {
  const [clickedRow, setClickedRow] = useState<User | undefined>();

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    row: User
  ): void => {
    setClickedRow(row);
  };

  const columns = gridColumns(onButtonClick);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div className={isMobile ? styles.dataGridMobile : styles.dataGrid}>
        <p className={styles.title}>Employees data table</p>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "var(--dataGrid-color)",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          rows={rows}
          columns={columns}
        />
      </div>
      <AddUser />
    </div>
  );
};

export default Users;
