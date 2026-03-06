interface CardProps {
    name?: string,
    title?: string,
    description?: string,
    children?: React.ReactNode
}

const Card = ({  name, description, title, children  }: CardProps) => {
    return (
        <div className="border p-4 mb-4 text-amber-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-2">{title || name}</h2>
            {description && <p className="mb-2">{description}</p>}
            {children}
        </div>
    )
}

export default Card;