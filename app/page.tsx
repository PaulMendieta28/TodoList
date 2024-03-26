import Header from "@/components/Header";
import TodoList from '@/components/Todo';
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Header />
      <TodoList session={user} />
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
