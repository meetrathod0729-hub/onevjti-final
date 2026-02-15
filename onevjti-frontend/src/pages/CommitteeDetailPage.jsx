// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import { committeeProfiles } from '../data/committeeProfiles';

// const CommitteeDetailPage = () => {
//     const { id } = useParams();   // slug
//     const profile = committeeProfiles[id];

//     const [activeTab, setActiveTab] = useState('about');

//     if (!profile) {
//         return (
//             <div className="p-8">
//                 <h1 className="text-2xl font-bold">Demo profile not found</h1>
//                 <p className="text-gray-600">
//                     No frontend demo data for this committee yet.
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div className="p-8 max-w-6xl mx-auto">

//             <h1 className="text-4xl font-bold capitalize">{id}</h1>

//             {/* TABS */}
//             <div className="flex gap-6 border-b mb-6 mt-6">
//                 {['about', 'events', 'members'].map(tab => (
//                     <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`pb-2 font-semibold capitalize ${activeTab === tab
//                                 ? 'border-b-2 border-purple-600 text-purple-600'
//                                 : 'text-gray-500'
//                             }`}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {activeTab === 'about' && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                     {/* About Text */}
//                     <div className="bg-white rounded-xl shadow p-6">
//                         <h2 className="text-xl font-bold mb-3">About</h2>
//                         <p className="text-gray-700 leading-relaxed">
//                             {profile.about}
//                         </p>
//                     </div>

//                     {/* Info Card */}
//                     <div className="bg-white rounded-xl shadow p-6">
//                         <h2 className="text-xl font-bold mb-4">Information</h2>

//                         <div className="space-y-3">
//                             <div className="flex justify-between">
//                                 <span className="text-gray-500">Email</span>
//                                 <span className="font-semibold">{profile.email}</span>
//                             </div>

//                             <div className="flex justify-between">
//                                 <span className="text-gray-500">Founded</span>
//                                 <span className="font-semibold">{profile.founded}</span>
//                             </div>

//                             <div className="flex justify-between">
//                                 <span className="text-gray-500">Category</span>
//                                 <span className="font-semibold">{profile.category}</span>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             )}


//             {activeTab === 'events' && (
//                 <div>
//                     <h2 className="text-2xl font-bold mb-6">Events</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {profile.events.map((event, i) => (
//                             <div
//                                 key={i}
//                                 className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
//                             >
//                                 <h3 className="text-lg font-semibold mb-2">
//                                     {event}
//                                 </h3>
//                                 <p className="text-gray-500 text-sm">
//                                     Event details coming soon.
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {activeTab === 'members' && (
//                 <div>
//                     <h2 className="text-2xl font-bold mb-6">Core Team</h2>

//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//                         {profile.members.map((member, i) => (
//                             <div
//                                 key={i}
//                                 className="bg-white rounded-xl shadow p-5 text-center"
//                             >
//                                 <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
//                                     {member[0]}
//                                 </div>

//                                 <p className="font-semibold">{member}</p>
//                                 <p className="text-sm text-gray-500">
//                                     Committee Role
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default CommitteeDetailPage;
























// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import api from "../api/axios";

// const CommitteeDetailPage = () => {
//   const { id } = useParams(); // this is slug
//   const [committee, setCommittee] = useState(null);
//   const [activeTab, setActiveTab] = useState("about");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCommittee = async () => {
//       try {
//         const res = await api.get(`/committees/slug/${id}`);
//         setCommittee(res.data.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommittee();
//   }, [id]);

//   if (loading) return <div className="p-8">Loading...</div>;

//   if (!committee) {
//     return (
//       <div className="p-8">
//         <h1 className="text-2xl font-bold">Committee not found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-6xl mx-auto">

//       <h1 className="text-4xl font-bold capitalize">
//         {committee.name}
//       </h1>

//       {/* Tabs */}
//       <div className="flex gap-6 border-b mb-6 mt-6">
//         {["about", "events", "members"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`pb-2 font-semibold capitalize ${
//               activeTab === tab
//                 ? "border-b-2 border-purple-600 text-purple-600"
//                 : "text-gray-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* ABOUT TAB */}
//       {activeTab === "about" && (
//         <div className="bg-white rounded-xl shadow p-6">
//           <h2 className="text-xl font-bold mb-3">About</h2>
//           <p className="text-gray-700 leading-relaxed">
//             {committee.description}
//           </p>
//         </div>
//       )}

//       {/* EVENTS TAB */}
//       {activeTab === "events" && (
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Events</h2>
//           <p className="text-gray-500">
//             (Next step: fetch committee events dynamically)
//           </p>
//         </div>
//       )}

//       {/* MEMBERS TAB */}
//       {activeTab === "members" && (
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Members</h2>
//           <p className="text-gray-500">
//             (Next step: fetch committee members dynamically)
//           </p>
//         </div>
//       )}

//     </div>
//   );
// };

// export default CommitteeDetailPage;

















































































































import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

const CommitteeDetailPage = () => {
  const { id } = useParams(); // slug

  const [committee, setCommittee] = useState(null);
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const res = await api.get(`/committees/slug/${id}`);
        const committeeData = res.data.data;
        setCommittee(committeeData);

        // Fetch events
        const eventRes = await api.get(
          `/events/committee/${committeeData._id}`
        );
        setEvents(eventRes.data.data);

        // Fetch members
        const memberRes = await api.get(
          `/committees/${committeeData._id}/members`
        );
        setMembers(memberRes.data.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommittee();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;

  if (!committee) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Committee not found</h1>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold capitalize">
        {committee.name}
      </h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6 mt-6">
        {["about", "events", "members"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold capitalize ${
              activeTab === tab
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ABOUT */}
      {activeTab === "about" && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-3">About</h2>
          <p className="text-gray-700 leading-relaxed">
            {committee.description}
          </p>
        </div>
      )}

      {/* EVENTS */}
      {activeTab === "events" && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Events</h2>

          {events.length === 0 ? (
            <p className="text-gray-500">No events yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow p-5"
                >
                  <h3 className="text-lg font-semibold">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MEMBERS */}
      {activeTab === "members" && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Members</h2>

          {members.length === 0 ? (
            <p className="text-gray-500">No members yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-xl shadow p-5 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                    {member.user?.fullName?.[0] || "U"}
                  </div>

                  <p className="font-semibold">
                    {member.user?.fullName}
                  </p>

                  <p className="text-sm text-gray-500 capitalize">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default CommitteeDetailPage;
