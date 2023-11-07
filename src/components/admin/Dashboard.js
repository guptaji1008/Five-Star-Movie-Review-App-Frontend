import React, { useEffect, useState } from "react";
import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";
import { getAppInfo } from "../../api/admin";


export default function Dashboard({toast}) {

  const [appInfo, setAppInfo] = useState({})

  // fetching data like no. of reviews, no. of users and no. of movie uploaded
  const fetchAdminData = async () => {
    const { appInfo, error } = await getAppInfo()
    if (error) return toast.error(error)
    // setting all info in appInfo object
    setAppInfo({ ...appInfo })
  }

  // whenever appInfo changes fetchAdminData function will run
  useEffect(() => {
    if (appInfo) fetchAdminData()
  }, [appInfo])

  const { reviewCount, userCount, movieCount } = appInfo

  return (
    <div className="grid grid-cols-3 gap-5">
      <AppInfoBox title="Total Uploads" subTitle={movieCount} />
      <AppInfoBox title="Total Reviews" subTitle={reviewCount} />
      <AppInfoBox title="Total Users" subTitle={userCount} />
      {/* Displaying latest uploaded movie */}
      <LatestUploads toast={toast} />
    </div>
  );
}
