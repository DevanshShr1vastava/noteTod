/* eslint-disable prettier/prettier */
'use client';
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const NewNoTodo = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const createNote = async()=>{
    await fetch("http://127.0.0.1:8090/api/collections/noteTodo/records",
      {
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify({
          title,content
        })
      }
    );

    setContent('');
    setTitle('');
    router.refresh();
  }

  return (
    <form onSubmit={createNote}>
    <div className="container flex-col gap-4 px-8 py-8 rounded-2xl flex bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      <Input
        isClearable
        classNames={{
          label: "text-black/50 dark:text-white/90 ",
          input: [
            "bg-transparent ",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent ",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Enter title..."
        radius="lg"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      
      <Textarea
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent ",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Enter Content..."
        radius="lg"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      />
      <Button className="self-end" type="submit" variant="shadow">Add Note</Button>
    </div>
    </form>
  );
};
