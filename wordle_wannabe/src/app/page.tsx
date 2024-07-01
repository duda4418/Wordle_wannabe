import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen bg-[#e3e3e1] flex flex-col justify-center items-center">
      <h1 className="font-bold text-6xl font-serif">Wordle</h1>
      <div className="">
        <Link href="/game">
          <button className="btn bg-black text-[#e3e3e1] hover:[#e3e3e1] hover:text-black hover:border-black
              m-7 px-16 rounded-full text-base">
            Play
          </button>
        </Link>
        <Link href="/login">
          <button className="btn bg-[#e3e3e1] text-black border-black m-7 px-16 rounded-full text-base">
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
}   
