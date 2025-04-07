import { Doodles } from './Doodles';
import { getSpeedAchievement } from '../utils/speedAchievements';

type ResultViewProps = {
  wpm: number;
  accuracy: number;
  wpmHistory: number[];
  rawWpmHistory: number[];
  errorHistory: number[];
};

// type ChartData = {
//   time: number;
//   wpm: number;
//   raw: number;
//   errors: number;
// };

export function ResultView({ wpm, accuracy }: ResultViewProps) {
  const achievement = getSpeedAchievement(wpm);

  return (
    <>
      <Doodles />
      <div className="w-full max-w-[1200px] px-4 bg-white/50 dark:bg-black/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-[#FFD1DC]">
        <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="basis-full md:basis-1/4 w-full aspect-sqaure mx-auto mb-4">
            <img
              src={achievement.illustration}
              alt={achievement.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grow">
          <div className="text-center mb-8">
          <div className="text-3xl font-bold text-[#FF6B95] mb-2">
            {achievement.title}
          </div>
          <div className="text-xl text-[#FF99B4]">{achievement.message}</div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl md:text-6xl font-bold text-[#FF6B95] flex items-center justify-center gap-2">
              {wpm} <span className="text-3xl">🐰</span>
            </div>
            <div className="text-xl text-[#FF99B4]">wpm</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-6xl font-bold text-[#FF6B95] flex items-center justify-center gap-2">
              {accuracy < 0 ? "0" : accuracy}% <span className="text-3xl">🥕</span>
            </div>
            <div className="text-xl text-center text-[#FF99B4]">accuracy</div>
          </div>
        </div>
          </div>
        </div>
       

        {/* <div className="h-80 bg-[#2D2D2D] rounded-2xl p-4 border-2 border-[#444]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis 
                dataKey="time" 
                stroke="#666" 
                tickLine={false}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                stroke="#666" 
                tickLine={false}
                tick={{ fill: '#666' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="wpm" 
                stroke="#FFD700" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4, fill: "#FFD700" }}
              />
              <Line 
                type="monotone" 
                dataKey="raw" 
                stroke="#666" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4, fill: "#666" }}
              />
              {errorHistory.map((_, index) => (
                errorHistory[index] > 0 && (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={`errors`}
                    stroke="#FF6B6B"
                    strokeWidth={0}
                    dot={{ r: 4, fill: "#FF6B6B" }}
                    data={[chartData[index]]}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div> */}
      </div>
    </>
  );
}