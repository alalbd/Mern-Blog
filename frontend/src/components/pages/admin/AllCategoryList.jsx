import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import Button from "../../form/Button";
import Meta from "../../Meta";
import StrLength from "../../utilities/StrLength";


const AllCategoryList = () => {
  const [userPost, setUserPost] = useState([]);
  const user = localStorage.getItem("loggedUser");
  const token = localStorage.getItem("token");

  const { name, email, userID, user_role } = JSON.parse(user);

  // Get All Post By User
  useEffect(() => {
    const FeatchData = async () => {
      const res = await fetch(`http://127.0.0.1:5000/api/v1/category/get/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resultData = await res.json();
      setUserPost(resultData?.data);
    };
    FeatchData();
  }, [userID, token]);

  // Delete Post
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/v1/category/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();

        // delete the user
        setUserPost((userPost) => userPost.filter((post) => post._id !== id));

        // Success Message
        toast.success(result?.message);
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <>
      <Meta title={"All Category List"} />
      <div className="container">
        <div className="row">
          <AdminSidebar name={name} email={email} role={user_role} />
          <div className="col-9">
            <div className="card">
              <div className="p-2">
                <div className="d-flex justify-content-between">
                  <h3 className="m-0">All Category List</h3>
                  <NavLink
                    to={"/admin/add/new/category"}
                    className="py-1 px-3 border rounded"
                  >
                    Add New Category
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="py-3">
              <div className="card">
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Publishe Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPost?.map((value, key) => (
                        <tr key={key}>
                          <th scope="row">1</th>
                          <td>
                            <StrLength str={value?.category_name} strLen={30} />
                          </td>
                          <td>
                            {moment(value?.createdAt).startOf("day").fromNow()}
                          </td>
                          <td>
                            <NavLink
                              className="f-14 btn btn-success py-0 px-2 me-2 text-white"
                              to={`/admin/edit/${value._id}/category`} state={{ name: value?.category_name }}
                            >
                              Edit
                            </NavLink>
                            <Button
                              className="f-14 btn btn-danger py-0 px-2  text-white"
                              onClick={() => handleDelete(value?._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default AllCategoryList;
