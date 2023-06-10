import React from "react";
import photo from '../../assets/lawyer-img.jpg'
function AttorneyProfile() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Attorney
            </h2>
            <p className="mt-4 text-gray-500">
            My name is Naphtalia Lafontant & I’m the Founding Attorney of NCL Consulting LLC. 
            NCL Consulting LLC provides business consulting, contract review and drafting, and civil litigation services. 
            I opened the firm in 2021 to service clients that need both business consulting and litigation advice.

            When I attended law school back in 2012, I knew that I wanted to practice both litigation and business law. 
            I did not understand why law schools made prospective attorneys choose one or the other. After all,
            knowledge and expertise in both practice areas is extremely valuable. But since I had to choose 
            I chose to first gain experience in civil litigation and then pursue experiences in business law. 

            My civil litigation and business law experience is extensive. I have knowledge and experience in products liability, 
            federal civil rights law, and labor and employment. I’ve practiced in federal court and in administrative agencies. 
            I’ve attended mediations, arbitrations, and settlement conferences. I am familiar with the discovery process and trial. 

            Very early in my legal career I gained regulatory compliance and contract negotiation 
            experience. I have knowledge and expertise drafting, reviewing, 
            and editing an array of contracts including technology agreements and employment contracts. 
            I’ve also provided businesses with legal advice concerning entity formation and intellectual property.

            In terms of my education, I’m a University of Chicago alum. I obtained my bachelor’s degree in Public Policy. 
            And I received my Juris Doctor from Suffolk University Law School. 
            I’m barred in Illinois and Massachusetts and I have general bar admission in the Northern District of Illinois. 
            </p>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="max-w-md mx-auto sm:max-w-lg lg:ml-auto lg:max-w-none lg:w-96">
              <div className="aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                <img
                  className="object-cover"
                  src={photo}
                  alt="Attorney Profile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttorneyProfile;
