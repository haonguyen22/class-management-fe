function SettingFrameLayout({
  title,
  trailing,
  children,
}: {
  title: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 py-4 border shadow-sm rounded-md border-solid border-black mr-4">
      <div className="flex flex-row justify-between  mb-8">
        <h2 className="text-2xl text-blue-700 font-bold">{title}</h2>
        {trailing}
      </div>
      {children}
    </div>
  );
}

export default SettingFrameLayout;
