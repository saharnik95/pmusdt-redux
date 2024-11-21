import ConfirmLevel from "@/components/organisms/ConfirmLevel";
import ExchangeLevel from "@/components/organisms/ExchangeLevel";
import TopBar from "@/components/organisms/TopBar";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-between lg:px-0  lg: mx-auto lg:gap-12 lg:py-12 md:gap-8 gap-4 md:px-8 md:py-6 px-4 py-6 max-w-[1140px]">
      <TopBar />

      {/*<ConfirmLevel />*/}
      <ExchangeLevel />
    </div>
  );
}
