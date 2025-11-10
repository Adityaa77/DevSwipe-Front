import axios from "axios";
import { BASE_URL } from "../utls/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utls/requestslice";
import { useEffect } from "react";

const ConnectionRequests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res.data.message);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err.response?.data || err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
     console.log("Fetched requests:", res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
       const user = request.fromuserId || request.fromUserId;
              if (!user) return null;
              const { _id, Name, LastName, PhotoUrl, Age, Gender, About } = user;


        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 mx-auto"
          >
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={PhotoUrl} />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{Name + " " + LastName}</h2>
              {Age && Gender && <p>{Age + ", " + Gender}</p>}
              <p>{About}</p>
              
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionRequests;