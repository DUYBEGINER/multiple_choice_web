import React from "react";
import Header from "./layout/Header";
import SideBar from "./layout/SideBar";
import EditorArea from "./layout/EditorArea";

function CreateQuizPage(props) {

  return (
    <main className="h-screen flex flex-col w-full bg-gray-50 text-gray-900 ">
      <Header />
      <div className="flex-1 px-4 py-3 grid grid-cols-[300px_1fr] gap-2 overflow-hidden">
        <SideBar />
        <EditorArea />
      </div>
    </main>
  );
}

export default CreateQuizPage;
