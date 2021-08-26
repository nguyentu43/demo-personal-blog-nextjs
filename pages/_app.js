import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import "tailwindcss/tailwind.css";
import LoadAuth from "../components/LoadAuth";
import ProtectRoute from "../components/ProtectRoute";
import { Provider } from "../context";
import Layout from "../layout";
import api from "../services/api";

function MyApp({ Component, pageProps }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						queryFn: async ({ queryKey }) => {
							return await api(queryKey[0], queryKey[1], "GET");
						},
					},
				},
			})
	);

	return (
		<Provider>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Layout>
						<LoadAuth>
							<ProtectRoute>
								<Component {...pageProps} />
							</ProtectRoute>
						</LoadAuth>
					</Layout>
				</Hydrate>
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;
