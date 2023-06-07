import { TextField } from "@mui/material";
import { Button, Box } from "@mui/material";
import styles from "./restaurant.module.css";

const AddRestaurant = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.newRestaurant}>Add new restaurant</h2>

      <form>
        <div className={styles["user-details"]}>
          <div className={styles["flex-column"]}>
            <Box marginBottom={"4%"}>
              <TextField
                className={styles.userInputs}
                label="Restaurant Name"
                variant="outlined"
                size="small"
                color="warning"
                required
                fullWidth
              />
            </Box>

            <Box marginBottom={"4%"}>
              <TextField
                className={styles.userInputs}
                id="filled-basic"
                label="Tables Count"
                variant="outlined"
                size="small"
                color="warning"
                required
                fullWidth
              />
            </Box>

            <Box marginBottom={"4%"}>
              <TextField
                className={styles.userInputs}
                id="filled-basic"
                label="Phone Number"
                variant="outlined"
                size="small"
                color="warning"
                required
                fullWidth
              />
            </Box>
          </div>

          <div className={styles["flex-column"]}>
            <Box marginBottom={"4%"}>
              <TextField
                className={styles.userInputs}
                id="filled-basic"
                label="Address"
                variant="outlined"
                size="small"
                color="warning"
                required
                fullWidth
              >
                Number
              </TextField>
            </Box>

            <Box marginBottom={"4%"}>
              <TextField
                className={styles.userInputs}
                id="filled-basic"
                label="Email Address"
                variant="outlined"
                size="small"
                color="warning"
                required
                fullWidth
              />
            </Box>

            <Box marginBottom={"4%"}>
              <TextField
                className={styles.userInputs}
                id="filled-basic"
                label="Phone Number 2"
                variant="outlined"
                size="small"
                color="warning"
                required
                fullWidth
              >
                Number
              </TextField>
            </Box>
          </div>
        </div>
        <div className={styles["flex-column"]}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--brown-color)",
              fontWeight: "bold",
              fontSize: "12px",
            }}
            fullWidth
          >
            Add Restaurant
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
