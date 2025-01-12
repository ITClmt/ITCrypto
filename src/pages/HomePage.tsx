import { useOutletContext } from "react-router";
import DashBoard from "../components/DashBoard";

export default function HomePage() {
  const { coins } = useOutletContext();

  return (
    <>
      <DashBoard coins={coins} />
    </>
  );
}
