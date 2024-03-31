import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={" Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum corporis quaerat, ducimus aspernatur debitis sunt! Totam debitis quos laborum quibusdam consequuntur blanditiis minima, rem autem molestias aut quod et ex.
         </p>
          <p> Doloremque mollitia iste natus ipsa, excepturi nemo consectetur molestias ab nisi doloribus dolores ea? Nulla optio quisquam, ea aut tenetur veritatis obcaecati placeat amet vel illum eius itaque possimus ducimus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum corporis quaerat, ducimus aspernatur debitis sunt! Totam debitis quos laborum quibusdam consequuntur blanditiis minima, rem autem molestias aut quod et ex.</p>
          <p> Doloremque mollitia iste natus ipsa, excepturi nemo consectetur molestias ab nisi doloribus dolores ea? Nulla optio quisquam, ea aut tenetur veritatis obcaecati placeat amet vel illum eius itaque possimus ducimus?</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
