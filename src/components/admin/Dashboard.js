import React, { useEffect, useState } from "react";
import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";
import { getAppInfo } from "../../api/admin";


export default function Dashboard({toast}) {

  const [appInfo, setAppInfo] = useState({})

  const fetchAdminData = async () => {
    const { appInfo, error } = await getAppInfo()
    if (error) return toast.error(error)
    setAppInfo({ ...appInfo })
  }

  useEffect(() => {
    if (appInfo) fetchAdminData()
  }, [appInfo])

  const { reviewCount, userCount, movieCount } = appInfo

  return (
    <div className="grid grid-cols-3 gap-5">
      <AppInfoBox title="Total Uploads" subTitle={movieCount} />
      <AppInfoBox title="Total Reviews" subTitle={reviewCount} />
      <AppInfoBox title="Total Users" subTitle={userCount} />
      <LatestUploads toast={toast} />
    </div>
  );
}
