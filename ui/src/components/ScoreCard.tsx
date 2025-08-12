type Score = {
    score_value: number;
    score_range: string;
    schufa_text: string;
    schufa_risk_rate: number;
    schufa_info_text: string[];
    score_timestamp: string;
}

export interface ScoreCardProps {
    score: Score;
}

const getScoreColor = (range: string) => {
    switch (range.toUpperCase()) {
        case 'A':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'B':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'C':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'D':
            return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'E':
        case 'F':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const ScoreCard = ({ score }: ScoreCardProps) => {
    const scoreColorClass = getScoreColor(score.score_range);

    return (
        <div className="w-full max-w-md mx-auto shadow-sm border border-gray-200 rounded-lg bg-white p-4 space-y-4">
            <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full font-medium border ${scoreColorClass}`}>
                    {score.score_range}
                </span>
                <span className="text-xs text-gray-500">{formatDate(score.score_timestamp)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs text-gray-500 mb-0.5">Score</p>
                    <p className="text-3xl font-bold text-gray-900">{score.score_value}</p>
                    <p className="text-xs text-gray-600">{score.schufa_text}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-0.5">Ausfallrisiko</p>
                    <p className="text-lg font-semibold text-gray-900">{score.schufa_risk_rate}%</p>
                </div>
            </div>

            {score.schufa_info_text?.length > 0 && (
                <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Zusätzliche Informationen</p>
                    <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                        {score.schufa_info_text.map((info, i) => (
                            <li key={i}>{info}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};