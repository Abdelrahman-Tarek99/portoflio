export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#1D1F20] grid place-items-center">
      <div className="relative h-[50px] w-[50px] animate-loader-rotate">
        <span className="block h-[20px] w-[20px] rounded-full bg-[#cb2025] mb-[10px] animate-loader-ball1 shadow-[30px_0_0_#f8b334]" />
        <span className="block h-[20px] w-[20px] rounded-full bg-[#00a096] animate-loader-ball2 shadow-[30px_0_0_#97bf0d]" />
      </div>
    </div>
  );
}
