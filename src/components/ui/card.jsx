export function Card({ children }) {
    return <div className="bg-white shadow-md rounded-lg overflow-hidden">{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="bg-gray-200 p-4 border-b">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <h2 className="text-xl font-semibold">{children}</h2>;
  }
  