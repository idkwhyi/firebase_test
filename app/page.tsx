"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ContentInterface {
  title: string;
  description: string;
}

const getContent = async () => {
  const querySnapshot = await getDocs(collection(db, "content"));
  const content = querySnapshot.docs.map((doc) =>
    doc.data()
  ) as ContentInterface[];
  console.log(content);
  return content;
};

export default function Home() {
  const [content, setContent] = useState<ContentInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getContent();
      setContent(content);
    };
    fetchData();
  }, []);

  return (
    <div>
      {content.map((cnt, index) => (
        <div key={index}>
          <h1>{cnt.title}</h1>
          <p>{cnt.content}</p>
        </div>
      ))}
    </div>
  );
}
