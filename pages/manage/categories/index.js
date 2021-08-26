import { useRouter } from "next/dist/client/router";
import Category from "../../../components/Category";
import ContentDialog from "../../../components/ContentDialog";
import Button from "../../../components/ui/Button";
import api from "../../../services/api";
import { deleteCategory } from "../../../services/categories";

export default function CategoryList({ categories }) {
	const router = useRouter();

	async function handleDelete(id) {
		let res = await deleteCategory(id);
		if (res.ok) {
			router.reload();
		}
	}

	return (
		<div className="md:col-span-3 lg:col-span-4 p-4 bg-white rounded-lg shadow-lg">
			<div className="flex pb-2">
				<Button
					href={`/manage/categories/edit/create`}
					className="bg-blue-500 text-white"
				>
					Add new
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
				{categories.map((category, index) => (
					<div className="relative" key={index}>
						<Category category={category} />
						<Button
							href={`/manage/categories/edit/${category._id}`}
							className="bg-green-500 text-white absolute top-2 right-2"
						>
							Edit
						</Button>
						<ContentDialog
							title="Delete this category?"
							onAccept={() => handleDelete(category._id)}
							button={
								<Button className="bg-red-500 text-white absolute top-12 right-2">
									Remove
								</Button>
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export const getServerSideProps = async () => {
	const categories = await api("/categories");
	return {
		props: { categories },
	};
};
