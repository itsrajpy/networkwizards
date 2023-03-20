import React from "react";
import { useQuery, gql } from "@apollo/client";
import Cards from "../components/Cards/Cards";
import IntroPage from "../components/IntroPage/IntroPage";
import ErrorPage from "../components/OtherCom/ErrorPage";
import Loading from "../components/OtherCom/Loading";

const Coding = ({ darkMode, search }) => {
	const CODINGS_QUERY = gql`
		query CODINGS_QUERY($searchValue: String!) {
			codings(where: { postName_contains: $searchValue }) {
				id
				title
				postName
				postDescription
			}
		}
	`;
	const { loading, error, data } = useQuery(CODINGS_QUERY, {
		variables: { searchValue: search },
	});

	if (loading) {
		return <Loading loading={loading} darkMode={darkMode} />;
	}
	if (error) {
		return <ErrorPage error={error} />;
	}
	const { codings } = data;
	return (
		<div className={`ContentPage ${darkMode ? "dark" : "light"}`}>
			<IntroPage darkMode={darkMode} typingEffect={false} PageName={"Coding"} />
			<div className="CardSection">
				{codings &&
					codings.map((card) => (
						<Cards
							key={card.id}
							cardID={card.title}
							page={"coding"}
							darkMode={darkMode}
							title={card.postName}
							content={<p dangerouslySetInnerHTML={{ __html: card.postDescription }} />}
						/>
					))}
			</div>
			<div className="space"></div>
		</div>
	);
};

export default Coding;
