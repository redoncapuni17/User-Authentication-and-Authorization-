import { Suspense, lazy, useEffect, useState } from "react";
import { fetchCongressDataToFirestore } from "../../firebase/firestore";
import Header from "../../header";
const LazyCongressUser = lazy(() => import("./congresUser"));

export default function UserDashboard({ currentUser }) {
  const [congressLists, setCongressLists] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch congress data from Firestore
  useEffect(() => {
    const fetchCongressData = async () => {
      try {
        setLoading(true);
        let congressData;
        if (filterType) {
          congressData = await fetchCongressDataToFirestore(filterType);
        } else {
          congressData = await fetchCongressDataToFirestore();
        }
        setCongressLists(congressData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching congress data: ", error);
      }
    };

    fetchCongressData();
  }, [filterType]);

  return (
    <div className="w-full justify-center">
      <main className="flex flex-col  px-7 py-5 ">
        <Header currentUser={currentUser} />
        <Suspense fallback={<p>Loading...</p>}>
          <LazyCongressUser
            congressData={congressLists}
            currentUser={currentUser}
            loading={loading}
            setFilterType={setFilterType}
            filterType={filterType}
          />
        </Suspense>
      </main>
    </div>
  );
}
