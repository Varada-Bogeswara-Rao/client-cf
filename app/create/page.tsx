// app/create/page.tsx
import CreateForm from "../components/CreateForm";
import { ShineBorder } from "../components/UI/shine-border";

export default function CreatePage() {
    return (
        <div className="max-w-md mx-auto p-6">
            <ShineBorder />
            <h1 className="text-2xl font-bold mb-4">Create Campaign</h1>
            <CreateForm />
        </div>
    )
}