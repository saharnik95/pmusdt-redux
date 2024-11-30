import MultipleIconComponent from "@/components/icons/MultipleIconComponent";
import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import Input from "./Input";
import Button from "../form/Button";
interface TableModalProps {
  open: boolean;
  handleClose: () => void;
}
export default function TableModal({ open, handleClose }: TableModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        alignItems: "center",
        justifyContent: "center",
        paddingX: {
          lg: "59px",
          md: "49px",
          sm: "39px",
          xs: "29px",
        },
        paddingTop: "32px",
        paddingBottom: "58px",
        width: {
          lg: "744px",
          md: "630px",
          sm: "480px",
          xs: "320px",
        },
        height: "396px",
        backgroundColor: "#364153",
        borderRadius: "20px",
        marginX: "auto",
        marginY: "auto",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "400px",
          }}
        >
          <Typography
            variant="SH"
            className="text-white"
            id="modal-modal-title"
          >
            Withdraw
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
            <MultipleIconComponent />
          </IconButton>
        </Box>
        <Divider
          orientation="horizontal"
          sx={{
            width: "100%",
            backgroundColor: "#ABABAB",
            mb: "41px",
            mt: "34px",
          }}
        />

        <span className=" mb-[29px]">
          {" "}
          <Typography
            variant="FT"
            className="text-footer-text mb-[29px]"
            id="modal-modal-description"
          >
            Your Wallet Address (Tether TRC20){" "}
          </Typography>
        </span>

        <Input
          placeholder="Address"
          showSearchIcon={false}
          height={"57PX"}
        ></Input>

        <span className=" mt-[20px]">
          {" "}
          <Button height={"57PX"}>Confirm</Button>
        </span>
      </Box>
    </Modal>
  );
}
