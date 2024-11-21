/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface Note {
    id: string;
    title: string;
    content: string;
}

async function fetchNotes(): Promise<Note[]> {
    try {
        const res = await fetch('http://127.0.0.1:8090/api/collections/noteTodo/records?page=1&perPage=30', { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch notes');
        }
        const data = await res.json();

        return data?.items as Note[];
    } catch (error) {
        
        return [];
    }
}

const delNote = async (noteId: string): Promise<void> => {
    try {
        const res = await fetch(`http://127.0.0.1:8090/api/collections/noteTodo/records/${noteId}`, {
            method: "DELETE",
            cache: 'no-store',
            headers: {
                'Content-type': 'application/json',
            },
            next: { revalidate: 10 }
        });

        if (!res.ok) {
            throw new Error('Failed to delete note');
        }
    } catch (error) {
        
    }
}

export default function ListStuff() {
    const [notes, setNotes] = useState<Note[]>([]);
    const router = useRouter();

    useEffect(() => {
        const loadNotes = async () => {
            const fetchedNotes = await fetchNotes();

            setNotes(fetchedNotes);
        };

        loadNotes();
    }, []);

    const handleDelete = async (noteId: string) => {
        await delNote(noteId);
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
        router.refresh(); // Ensure the router is refreshed if needed
    };

    return (
        <div className="grid px-6 grid-cols-3 gap-4">
            {notes.map((item: Note) => (
                <Card key={item.id} className="max-w-[400px]">
                    <CardHeader className="flex justify-between gap-3">
                        <div>
                            <p className="font-bold text-lg">{item.title}</p>
                        </div>
                        <div className="order-last">
                            <Button
                                isIconOnly
                                type="button"
                                variant="light" 
                                onPress={() => handleDelete(item.id)}
                            >
                                <FontAwesomeIcon icon={faX} />
                            </Button>
                        </div>
                        {/* <img alt="" src={item.imageSrc} /> */}
                    </CardHeader>
                    <CardBody>
                        <p>{item.content}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
