type TempCardProps = {
  cardName: string;
  className: string | null;
};

export const TempCard = ({cardName, className} : TempCardProps) => {
    return (
        <div className={`w-full h-full bg-slate-900 text-white text-center ${className}`}>
            <p>{cardName}</p>
        </div>
    )
}