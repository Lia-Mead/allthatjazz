import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { myLastV } from "./actions";
import EditVenue from "./editVenue";

export default function MyNewVen(props) {
    // console.log("props in mynew ven", props);
    // console.log("props id", props.id);

    const dispatch = useDispatch();

    const showLast = useSelector((state) => state.lastVen);
    const showUploader = useSelector((state) => state.uploader);

    // console.log("show last", showLast);
    // console.log("showUploader", showUploader);

    const [editVenue, setEditVenue] = useState(false);
    // const [editVenPic, setEditVenPic] = useState(false);
    // const [error, setError] = useState(false);

    const toggleEditVenue = () => {
        setEditVenue(!editVenue);
    };

    useEffect(() => {
        dispatch(myLastV());
    }, []);

    return (
        <>
            {showLast && showUploader[0].id == props.id && (
                <div className="my-ven-con">
                    {showLast &&
                        showLast.map((ven) => (
                            <div key={ven.id}>
                                <div className="my-ven-box">
                                    <h2>
                                        Thank you for adding {""}
                                        <span className="orange">
                                            {ven.name}
                                        </span>
                                    </h2>
                                    <img
                                        className="my-ven-pic"
                                        src={
                                            ven.image ||
                                            "/images/ven-avatar.jpg"
                                        }
                                    />
                                    <div className="my-ven-box">
                                        <p className="gray">
                                            {showUploader[0].first}{" "}
                                            {showUploader[0].last} on{" "}
                                            {ven.created_at
                                                .slice(0, 16)
                                                .replace("T", " at ")}
                                        </p>

                                        <div className="my-ven-box">
                                            <button
                                                onClick={() =>
                                                    toggleEditVenue()
                                                }
                                                className="btn edit"
                                            >
                                                Edit Venue
                                            </button>
                                        </div>

                                        {editVenue && (
                                            <EditVenue
                                                id={props.id}
                                                venId={props.venId}
                                                first={props.first}
                                                last={props.last}
                                                lat={props.lat}
                                                lng={props.lng}
                                                updateNewVen={
                                                    props.updateNewVen
                                                }
                                                editVenue={editVenue}
                                                toggleEditVenue={
                                                    toggleEditVenue
                                                }
                                                delVenFn={props.delVenFn}
                                            />
                                        )}

                                        <img
                                            className="icon big"
                                            src="/images/sax.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
}

//  <Link to={`/edit-venue`}>
//      <button className="btn edit">Edit Venue</button>
//  </Link>;

//  return (
//      <div className="my-ven-con">
//          {showLast &&
//              showLast.map((ven) => (
//                  <div key={ven.id}>
//                      <div className="my-ven-box">
//                          <h2>
//                              Thank you for adding {""}
//                              <span className="orange">{ven.name}</span>
//                          </h2>
//                          <img
//                              className="my-ven-pic"
//                              src={ven.image || "/images/ven-avatar.jpg"}
//                          />
//                          <div className="my-ven-box">
//                              <p className="gray">
//                                  {props.first} {props.last} on{" "}
//                                  {ven.created_at
//                                      .slice(0, 16)
//                                      .replace("T", " at ")}
//                              </p>

//                              <div className="my-ven-box">
//                                  <button
//                                      onClick={() => toggleEditVenue()}
//                                      className="btn edit"
//                                  >
//                                      Edit Venue
//                                  </button>
//                              </div>

//                              {editVenue && (
//                                  <EditVenue
//                                      id={props.id}
//                                      venId={props.venId}
//                                      first={props.first}
//                                      last={props.last}
//                                      lat={props.lat}
//                                      lng={props.lng}
//                                      updateNewVen={props.updateNewVen}
//                                      editVenue={editVenue}
//                                      toggleEditVenue={toggleEditVenue}
//                                      delVenFn={props.delVenFn}
//                                  />
//                              )}

//                              <img className="icon big" src="/images/sax.svg" />
//                          </div>
//                      </div>
//                  </div>
//              ))}
//      </div>
//  );
