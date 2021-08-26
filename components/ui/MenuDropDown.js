import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function MenuDropDown({ button, items = [] }) {
	return (
		<Menu as="div" className="relative">
			<Menu.Button as="div" className="flex items-center cursor-pointer">
				{button}
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					as="div"
					className="absolute z-20 outline-none mt-4 rounded-lg shadow-lg -right-4 bg-white w-64 p-2 flex flex-col"
				>
					{items.map((item, index) => (
						<Menu.Item key={index} onClick={item.onClick}>
							{({ active }) => (
								<div
									className={`${
										active && "bg-indigo-500 text-white"
									} p-2 rounded-lg flex space-x-2 items-center cursor-pointer`}
								>
									<item.icon className="w-5 h-5" /> <div>{item.name}</div>
								</div>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
