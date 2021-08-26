import EditCategory from "../../../../components/EditCategory";
import api from "../../../../services/api";

export default function UpdateCategory({ category }) {
	return <EditCategory initCategory={category} />;
}

export const getServerSideProps = async ({ params: { id } }) => {
	const category = await api(`/categories/${id}`);
	return { props: { category }, notFound: !category };
};
