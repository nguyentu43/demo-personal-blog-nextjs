import Link from "next/link";
import Category from "./Category";

export default function Categories({ categories = [] }) {
	return (
		<div className="col-span-1 lg:col-span-3 md:col-span-2">
			<div className="text-2xl font-bold">Categories</div>
			<div className="bg-white p-4 mt-4 rounded-lg shadow-lg flex flex-nowrap space-x-4 overflow-y-auto">
				{categories.map((category, index) => (
					<Category key={index} category={category} />
				))}
			</div>
		</div>
	);
}
