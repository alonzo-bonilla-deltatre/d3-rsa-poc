import { MenuItem } from '@/models/types/menu';

type MenuProps = {
  menuItems: MenuItem[];
  navItemClasses: string;
};

const HamburgerMenu = ({ ...data }: MenuProps) => {
  const { menuItems, navItemClasses } = data as MenuProps;
  const iconSize = 44;
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl">
          <div className="space-y-2">
            <span className="block h-1 w-10 origin-center rounded-full bg-white transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
            <span className="block h-1 w-8 origin-center rounded-full bg-[#EE3123] transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
          </div>
        </div>
      </div>
      {/* TO DO */}
    </>
  );
};

export default HamburgerMenu;
