import React from "react";
import SignUpForm from "@/components/layouts/signup/Form";
import Navbar from "@/components/modules/Navbar";

export default function SignUpPage() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-dvh flex justify-center bg-primary/5 md:py-14">
        <SignUpForm />
      </div>
    </>
  );
}
