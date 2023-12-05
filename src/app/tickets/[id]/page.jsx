import { notFound } from "next/navigation"

export const dynamicParams = false

export async function generateStaticParams() {
    const res = await fetch('https://weak-cyan-duckling-fez.cyclic.app/');
    const tickets = await res.json();
  
    if (!Array.isArray(tickets)) {
      // Handle the case where tickets is not an array,
      console.error('Tickets is not an array:', tickets);
      return [];
    }
  
    return tickets.map((ticket) => ({
      id: ticket._id,
    }));
  }
  

async function getTicket(id){
    const res = await fetch('https://weak-cyan-duckling-fez.cyclic.app/'+ id, {
        next: {
            revalidate: 60
        }
    })

    if(!res.ok){
        notFound()
    }
    return res.json()

}


export default async function page({ params }) {

    const ticketId = params.id
    const ticket = await getTicket( ticketId)
  
    return (
    <main>
        <nav>
            <h2>Ticket Details</h2>
        </nav>
        <div className="card">
            <h3>{ticket.title}</h3>
            <small>Created By {ticket.user_email}</small>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priotity
            </div>
        </div>
        {/* <h1>{ticketId}</h1> */}
    </main>
  )
}
