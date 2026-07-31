import Link from "next/link";

const TicketNavbar = () => {
  return (
    <div className="p-2 mb-2 flex justify-between items-center border-b ">
      <p>DeskLite Queue</p>
      <Link href={"/"} className="hover:font-semibold">
        + new ticket
      </Link>
    </div>
  );
};

export default TicketNavbar;
