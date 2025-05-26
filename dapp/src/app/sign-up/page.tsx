import React, { Suspense } from "react";
import SignUpForm from "@/components/layouts/signup/Form";
import Navbar from "@/components/modules/Navbar";
import Loading from "../loading";

export default function SignUpPage() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-dvh flex justify-center bg-primary/5 md:py-14">
        <Suspense fallback={<Loading />}>
          <SignUpForm />
        </Suspense>
      </div>
    </>
  );
}
