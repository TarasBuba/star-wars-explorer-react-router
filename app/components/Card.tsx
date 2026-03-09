interface CardProps {
    heading: string,
    description: string,
}

const Card = ({ description, heading }: CardProps) => {
    return (
        <div className="border p-4 mb-4 text-amber-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-2">{heading}</h2>
            {description && <p className="mb-2">{description}</p>}
        </div>
    )
}

export default Card;