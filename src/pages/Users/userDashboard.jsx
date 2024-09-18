import { Suspense, lazy, useEffect, useState } from "react";

import { fetchCongressDataToFirestore } from "../../Model/firestoreAdmin";
import Header from "../../components/header";
const LazyCongressUser = lazy(() => import("./congresUser"));

export default function UserDashboard({ currentUser }) {
  const [congressLists, setCongressLists] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch congress data from Firestore
  const fetchData = async (isLoadMore = false) => {
    try {
      setLoading(true);
      const result = await fetchCongressDataToFirestore(
        filterType,
        isLoadMore ? lastVisible : null
      );
      setLoading(false);
      if (result.data.length === 0) {
        setHasMore(false);
      } else {
        setCongressLists((prev) =>
          isLoadMore ? [...prev, ...result.data] : result.data
        );
        setLastVisible(result.lastVisible);
        if (result.data.length < 5) {
          setHasMore(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching congress data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterType]);

  return (
    <div className="w-full justify-center h-98 overflow-auto ">
      <main className="flex flex-col  px-7 py-5  ">
        <Header currentUser={currentUser} />
        <Suspense fallback={<p>Loading...</p>}>
          <LazyCongressUser
            congressData={congressLists}
            currentUser={currentUser}
            loading={loading}
            setFilterType={setFilterType}
            filterType={filterType}
            hasMore={hasMore}
            fetchData={() => fetchData(true)}
          />
        </Suspense>
      </main>
    </div>
  );
}
