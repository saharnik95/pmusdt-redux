import CopyIconComponent from "@/components/icons/CopyIconComponent";
import DiamondsIconComponent from "@/components/icons/DiamondsIconComponent";
import PersonsIconComponent from "@/components/icons/PersonsIconComponent";
import { Button, Typography } from "@mui/material";
import StickyHeadTable from "./CustomPaginationActionsTable";
import TableStatus from "@/components/atoms/table/TableStatus";
import { useRef, useState } from "react";
import TableModal from "@/components/atoms/table/TableModal";

const copyToClipboard = async (elementRef: React.RefObject<HTMLElement>) => {
  if (elementRef.current) {
    const text =
      elementRef.current.innerText || elementRef.current.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to Clipboard!");
    } catch (err) {
      console.error("Faild to copy", err);
    }
  }
};
interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string | JSX.Element;
}
const columns: Column[] = [
  { id: "Amount", label: "Amount", minWidth: 100, align: "center" },
  { id: "To", label: "To", minWidth: 100, align: "center" },
  { id: "Date", label: "Date", minWidth: 150, align: "center" },
  { id: "Status", label: "Status", minWidth: 100, align: "center" },
];
const truncate = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const rows = Array.from({ length: 4 }, (_, i) => {
  const statusText =
    i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Failed";
  const statusStyles = {
    Completed: { textColor: "#035610", bgColor: "#40A578" },
    Pending: { textColor: "#603E0F", bgColor: "#F3AC76" },
    Failed: { textColor: "#60140F", bgColor: "#F66066" },
  };

  return {
    To: (
      <span
        style={{
          color: "white",
        }}
      >
        <span className="hidden lg:block">
          x09aa998ee454c456255daf3ac94908f1dcfb7033
        </span>
        <span className="block lg:hidden">
          {truncate("x09aa998ee454c456255daf3ac94908f1dcfb7033", 10)}
        </span>
      </span>
    ),
    Amount: (
      <span className="flex flex-row items-center gap-2">
        <img
          src="./images/tether.png"
          alt=""
          className="w-6 h-6 rounded-full md:flex hidden"
        />
        USDT
      </span>
    ),
    Date: `25-02-2023`,
    Status: (
      <TableStatus
        textColor={statusStyles[statusText].textColor}
        bgColor={statusStyles[statusText].bgColor}
        text={statusText}
      />
    ),
    Link: <a href="#">See More</a>,
  };
});

export default function UserPartner() {
  const linkRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      className="flex flex-col w-full  bg-form-background lg:pt-[38px] lg:pb-[61px]  lg:px-[20px]
    md:pt-[28px] md:pb-[51px]  md:px-4  pt-[18px] pb-[41px]  px-2  rounded-[20px]"
    >
      {/*affilient link*/}
      <div className=" flex flex-col lg:gap-4 md:gap-3 gap-1">
        <Typography className="text-footer-text" variant="FT">
          Your Affiliate Link :
        </Typography>
        <div className="flex justify-between h-full  bg-primary-background rounded-[10px]">
          <span className=" lg:py-[19px] lg:px-[26px]   md:py-[11px] md:px-[15px] py-[6px] px-2">
            <Typography ref={linkRef} className="text-white" variant="FI">
              https://en.flashobmen.com/ref/acc0c4c8-c799-4216-a281-6d3d3c43a480{" "}
            </Typography>
          </span>

          <div
            className="flex items-center justify-center  bg-[#363F50] lg:py-[12px] lg:px-[21px]  py-3 px-1  rounded-[10px] gap-[6px]"
            onClick={() => copyToClipboard(linkRef)}
          >
            <span>
              <CopyIconComponent />
            </span>
            <Typography className="text-footer-text" variant="FR">
              Copy{" "}
            </Typography>
          </div>
        </div>
      </div>
      {/*wallet balance and friends*/}
      <div className="flex flex-col md:flex-row justify-between lg:gap-[23px] lg:pt-[11px]   gap-3 pt-2">
        {/*wallet balance */}

        <div className="flex items-center  justify-between w-full  bg-primary-background rounded-[10px] lg:px-[16px] lg:py-[22px] md:px-3 md:py-4 px-2 py-3 ">
          <div className="flex items-center justify-between lg:gap-[92px] md:gap-[18px] gap-3">
            <div className="flex items-center justify-between lg:gap-4 gap-2 ">
              <div className="bg-topBar-success flex justify-center items-center lg:w-[67px] lg:h-[67px]  w-[37px] h-[37px] rounded-full shadow-boxShadow">
                <DiamondsIconComponent size={25} color="white" />
              </div>

              <div className="flex flex-col lg:gap-[14px] gap-2">
                <Typography variant="PH" className="text-white text-nowrap">
                  Your Wallet Balance{" "}
                </Typography>
                <Typography variant="FH" className="text-topBar-success">
                  320 USDT{" "}
                </Typography>
              </div>
            </div>

            <div>
              <Button
                sx={{
                  color: "white",
                  width: { lg: "133px", md: "80px", xs: "60px" },
                  height: { lg: "51px", md: "41px", xs: "31px" },
                  background: "#40A578",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: { lg: "16px", md: "14px", xs: "12px" },
                  lineHeight: { lg: "20.8px", md: "18px", xs: "14px" },
                }}
                onClick={handleOpen}
              >
                withdraw
              </Button>
              <TableModal open={open} handleClose={handleClose}></TableModal>
            </div>
          </div>
        </div>

        {/* friends*/}

        <div className="flex  items-center w-full  bg-primary-background rounded-[10px] lg:py-[22px] lg:px-[32px] lg:gap-[19px] md:gap-3 gap-2 md:px-3 md:py-4 px-2 py-3">
          <div className="bg-topBar-pink flex justify-center items-center lg:w-[67px] lg:h-[67px]  w-[37px] h-[37px] rounded-full shadow-PinkboxShadow">
            <PersonsIconComponent />
          </div>

          <div className="flex flex-col  lg:gap-[14px]  gap-2">
            <Typography variant="PH" className="text-white text-nowrap">
              Your Friends{" "}
            </Typography>
            <Typography variant="FH" className="text-topBar-pink">
              320{" "}
            </Typography>
          </div>
        </div>
      </div>
      <div className="lg:mt-4 md:mt-3 mt-2">
        <Typography
          variant="FI"
          className="text-footer-text flex items-center lg:mt-4"
        >
          Get 10
          <span className="px-1">
            <DiamondsIconComponent size={19} color="#40A578" />
          </span>
          For Each Invited User
        </Typography>
      </div>
      <div className="lg:mt-[44px] lg:mb-[22px]  md:mt-[34px] md:mb-[12px] mt-[22px] mb-[8px]">
        <Typography variant="FH" className="text-white">
          Your Impressions
        </Typography>
      </div>
      <StickyHeadTable columns={columns} rows={rows} />
    </div>
  );
}
