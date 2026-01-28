import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Team {
  id: number;
  name: string;
  status: 'INVITE' | 'QUALIFICATION' | 'REGISTERED';
  logo: string;
  description: string;
  players: string[];
  results: string[];
  telegram?: string;
}

interface Player {
  id: number;
  nickname: string;
  team: string;
  avatar: string;
  achievements: string[];
}

interface Match {
  id: number;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  score?: string;
  time: string;
  streamUrl?: string;
}

const teams: Team[] = [
  { id: 1, name: 'HOLOXY', status: 'INVITE', logo: '🔷', description: 'Elite tier-1 team with major championship experience', players: ['player1', 'player2', 'player3', 'player4', 'player5'], results: ['#1 place — Online Cup 2x2', '#2 place — Online Cup 5x5'], telegram: 'https://t.me/holoxy' },
  { id: 2, name: 'REV TEAM', status: 'INVITE', logo: '⚡', description: 'Revolutionary roster featuring top-tier talent', players: ['rev1', 'rev2', 'rev3', 'rev4', 'rev5'], results: ['#1 place — Major Qualifier', '#3 place — Regional Finals'], telegram: 'https://t.me/revteam' },
  { id: 3, name: 'MONTEX', status: 'INVITE', logo: '🔺', description: 'Dominant force in competitive scene', players: ['mont1', 'mont2', 'mont3', 'mont4', 'mont5'], results: ['#1 place — International Cup', '#1 place — Spring Championship'] },
  { id: 4, name: 'PHOENIX RISE', status: 'QUALIFICATION', logo: '🔥', description: 'Rising stars aiming for glory', players: ['phx1', 'phx2', 'phx3', 'phx4', 'phx5'], results: ['#2 place — Qualifier Finals'] },
  { id: 5, name: 'CYBER WOLVES', status: 'QUALIFICATION', logo: '🐺', description: 'Aggressive playstyle, fearless execution', players: ['wolf1', 'wolf2', 'wolf3', 'wolf4', 'wolf5'], results: ['#1 place — Open Cup'] },
  { id: 6, name: 'NEON SQUAD', status: 'REGISTERED', logo: '💠', description: 'Fresh talent with promising potential', players: ['neon1', 'neon2', 'neon3', 'neon4', 'neon5'], results: [] },
  { id: 7, name: 'SHADOW OPS', status: 'REGISTERED', logo: '👁️', description: 'Strategic masterminds', players: ['shadow1', 'shadow2', 'shadow3', 'shadow4', 'shadow5'], results: [] },
  { id: 8, name: 'IRON TITANS', status: 'REGISTERED', logo: '⚙️', description: 'Mechanical precision', players: ['iron1', 'iron2', 'iron3', 'iron4', 'iron5'], results: [] },
  { id: 9, name: 'APEX LEGENDS', status: 'REGISTERED', logo: '👑', description: 'Legendary veterans', players: ['apex1', 'apex2', 'apex3', 'apex4', 'apex5'], results: [] },
  { id: 10, name: 'STORM RAIDERS', status: 'REGISTERED', logo: '⛈️', description: 'Fast and unpredictable', players: ['storm1', 'storm2', 'storm3', 'storm4', 'storm5'], results: [] },
  { id: 11, name: 'COSMIC FORCE', status: 'REGISTERED', logo: '🌌', description: 'Out of this world gameplay', players: ['cosmic1', 'cosmic2', 'cosmic3', 'cosmic4', 'cosmic5'], results: [] },
  { id: 12, name: 'VIPER SQUAD', status: 'REGISTERED', logo: '🐍', description: 'Strike fast, strike hard', players: ['viper1', 'viper2', 'viper3', 'viper4', 'viper5'], results: [] },
  { id: 13, name: 'GHOST PROTOCOL', status: 'REGISTERED', logo: '👻', description: 'Invisible until it\'s too late', players: ['ghost1', 'ghost2', 'ghost3', 'ghost4', 'ghost5'], results: [] },
  { id: 14, name: 'BLAZE UNIT', status: 'REGISTERED', logo: '🔶', description: 'Burning through competition', players: ['blaze1', 'blaze2', 'blaze3', 'blaze4', 'blaze5'], results: [] },
  { id: 15, name: 'FROST GIANTS', status: 'REGISTERED', logo: '❄️', description: 'Cold and calculated', players: ['frost1', 'frost2', 'frost3', 'frost4', 'frost5'], results: [] },
  { id: 16, name: 'NEXUS GAMING', status: 'REGISTERED', logo: '🔮', description: 'Connected excellence', players: ['nexus1', 'nexus2', 'nexus3', 'nexus4', 'nexus5'], results: [] },
];

const topPlayers: Player[] = [
  { id: 1, nickname: 'dieelo', team: 'HOLOXY', avatar: '👤', achievements: ['MVP 2024', 'Top Fragger'] },
  { id: 2, nickname: 's1mple', team: 'REV TEAM', avatar: '👤', achievements: ['Best AWPer', 'Tournament MVP'] },
  { id: 3, nickname: 'zywOo', team: 'MONTEX', avatar: '👤', achievements: ['Clutch Master', 'All-Star'] },
  { id: 4, nickname: 'NiKo', team: 'PHOENIX RISE', avatar: '👤', achievements: ['Legendary Rifler'] },
  { id: 5, nickname: 'dev1ce', team: 'CYBER WOLVES', avatar: '👤', achievements: ['Tournament Winner'] },
  { id: 6, nickname: 'electronic', team: 'HOLOXY', avatar: '👤', achievements: ['Support King'] },
];

const matches: Match[] = [
  { id: 1, team1: 'HOLOXY', team2: 'REV TEAM', logo1: '🔷', logo2: '⚡', status: 'LIVE', score: '13:11', time: 'Map 2 - Live', streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk' },
  { id: 2, team1: 'MONTEX', team2: 'PHOENIX RISE', logo1: '🔺', logo2: '🔥', status: 'UPCOMING', time: '18:00 MSK' },
  { id: 3, team1: 'CYBER WOLVES', team2: 'NEON SQUAD', logo1: '🐺', logo2: '💠', status: 'FINISHED', score: '16:8', time: 'Yesterday' },
];

export default function Index() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    const handleMouseMove = (e: MouseEvent) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cursorGlow.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background grain scan-lines">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5 pointer-events-none animate-[float_20s_ease-in-out_infinite]" />
      
      <div className="relative z-10">
        <div className="flex justify-center py-8">
          <img 
            src="https://cdn.poehali.dev/projects/88066814-aab4-4edc-be07-3cb757ba1710/bucket/4cd66419-0787-4c94-9056-8b4c6f7ed48f.png" 
            alt="FIRST SHOWDOWN Logo" 
            className="h-32 md:h-40 logo-breathe"
          />
        </div>
        
        <header className="border-b border-primary/20 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-wider glow-text text-center">
              FIRST SHOWDOWN
            </h1>
            <p className="text-sm text-muted-foreground mt-2 tracking-wide uppercase text-center">Premium Esports Tournament</p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <Tabs defaultValue="home" className="space-y-8">
            <TabsList className="glass-panel w-full flex flex-wrap justify-start gap-2 p-3 h-auto">
              <TabsTrigger value="home" className="text-xs md:text-sm uppercase tracking-wider">Home</TabsTrigger>
              <TabsTrigger value="about" className="text-xs md:text-sm uppercase tracking-wider">About</TabsTrigger>
              <TabsTrigger value="matches" className="text-xs md:text-sm uppercase tracking-wider">Matches</TabsTrigger>
              <TabsTrigger value="bracket" className="text-xs md:text-sm uppercase tracking-wider">Bracket</TabsTrigger>
              <TabsTrigger value="teams" className="text-xs md:text-sm uppercase tracking-wider">Teams</TabsTrigger>
              <TabsTrigger value="prize" className="text-xs md:text-sm uppercase tracking-wider">Prize Pool</TabsTrigger>
              <TabsTrigger value="rules" className="text-xs md:text-sm uppercase tracking-wider">Rules</TabsTrigger>
              <TabsTrigger value="players" className="text-xs md:text-sm uppercase tracking-wider">Top Players</TabsTrigger>
              <TabsTrigger value="top-teams" className="text-xs md:text-sm uppercase tracking-wider">Top Teams</TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="animate-fade-in-up">
              <div className="space-y-8">
                <div className="glass-panel p-8 animate-scale-in">
                  <h2 className="text-3xl font-heading mb-4 glow-text">LIVE MATCHES</h2>
                  <div className="grid gap-4">
                    {matches.map((match) => (
                      <div
                        key={match.id}
                        onClick={() => setSelectedMatch(match)}
                        className="glass-panel glass-panel-hover p-6 cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            <span className="text-4xl">{match.logo1}</span>
                            <span className="font-heading text-xl">{match.team1}</span>
                          </div>
                          
                          <div className="flex flex-col items-center gap-2 px-6">
                            {match.status === 'LIVE' && (
                              <Badge variant="destructive" className="animate-pulse-glow uppercase tracking-wider">
                                <Icon name="Radio" className="w-3 h-3 mr-1" />
                                Live
                              </Badge>
                            )}
                            {match.score && (
                              <div className="text-2xl font-bold font-heading">{match.score}</div>
                            )}
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">{match.time}</div>
                          </div>

                          <div className="flex items-center gap-4 flex-1 justify-end">
                            <span className="font-heading text-xl">{match.team2}</span>
                            <span className="text-4xl">{match.logo2}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about" className="animate-fade-in-up">
              <div className="glass-panel p-8 space-y-6">
                <h2 className="text-3xl font-heading glow-text">ABOUT TOURNAMENT</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>FIRST SHOWDOWN is a premium tier-1 esports tournament featuring the world's elite teams competing for glory and a substantial prize pool.</p>
                  <p>Experience cutting-edge competitive gaming with live broadcasts, professional commentary, and interactive features.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="glass-panel p-6 text-center">
                      <div className="text-4xl font-heading text-primary mb-2">16</div>
                      <div className="text-sm uppercase tracking-wider">Teams</div>
                    </div>
                    <div className="glass-panel p-6 text-center">
                      <div className="text-4xl font-heading text-primary mb-2">$250K</div>
                      <div className="text-sm uppercase tracking-wider">Prize Pool</div>
                    </div>
                    <div className="glass-panel p-6 text-center">
                      <div className="text-4xl font-heading text-primary mb-2">3</div>
                      <div className="text-sm uppercase tracking-wider">Weeks</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="matches" className="animate-fade-in-up">
              <div className="glass-panel p-8">
                <h2 className="text-3xl font-heading mb-6 glow-text">ALL MATCHES</h2>
                <div className="grid gap-4">
                  {matches.map((match) => (
                    <div
                      key={match.id}
                      onClick={() => setSelectedMatch(match)}
                      className="glass-panel glass-panel-hover p-6 cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-4xl">{match.logo1}</span>
                          <span className="font-heading text-xl">{match.team1}</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 px-6">
                          {match.status === 'LIVE' && (
                            <Badge variant="destructive" className="animate-pulse-glow uppercase">
                              <Icon name="Radio" className="w-3 h-3 mr-1" />
                              Live
                            </Badge>
                          )}
                          {match.score && (
                            <div className="text-2xl font-bold font-heading">{match.score}</div>
                          )}
                          <div className="text-xs text-muted-foreground uppercase">{match.time}</div>
                        </div>

                        <div className="flex items-center gap-4 flex-1 justify-end">
                          <span className="font-heading text-xl">{match.team2}</span>
                          <span className="text-4xl">{match.logo2}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bracket" className="animate-fade-in-up">
              <div className="glass-panel p-8">
                <h2 className="text-3xl font-heading mb-6 glow-text">TOURNAMENT BRACKET</h2>
                <div className="text-center text-muted-foreground py-12">
                  <Icon name="Trophy" className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <p className="text-lg">Bracket visualization coming soon</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="teams" className="animate-fade-in-up">
              <div className="glass-panel p-8">
                <h2 className="text-3xl font-heading mb-6 glow-text">PARTICIPATING TEAMS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {teams.map((team, index) => (
                    <div
                      key={team.id}
                      onClick={() => setSelectedTeam(team)}
                      className="glass-panel glass-panel-hover p-6 cursor-pointer text-center space-y-4 floating-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="font-heading text-lg tracking-wider">{team.name}</div>
                      <div className="text-6xl filter drop-shadow-lg">{team.logo}</div>
                      <Badge 
                        variant={team.status === 'INVITE' ? 'default' : team.status === 'QUALIFICATION' ? 'secondary' : 'outline'}
                        className="uppercase tracking-wider text-xs rounded-full px-3 py-1 shadow-lg shadow-primary/20"
                      >
                        {team.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prize" className="animate-fade-in-up">
              <div className="glass-panel p-8">
                <h2 className="text-3xl font-heading mb-6 glow-text">PRIZE POOL</h2>
                <div className="space-y-4">
                  {[
                    { place: '1st Place', prize: '$100,000', color: 'text-yellow-400' },
                    { place: '2nd Place', prize: '$50,000', color: 'text-gray-300' },
                    { place: '3rd Place', prize: '$30,000', color: 'text-amber-600' },
                    { place: '4th Place', prize: '$20,000', color: 'text-primary' },
                    { place: '5th-8th Place', prize: '$12,500', color: 'text-muted-foreground' },
                    { place: '9th-16th Place', prize: '$5,000', color: 'text-muted-foreground' },
                  ].map((item) => (
                    <div key={item.place} className="glass-panel glass-panel-hover p-6 flex justify-between items-center">
                      <div className="font-heading text-xl">{item.place}</div>
                      <div className={`text-2xl font-bold font-heading ${item.color}`}>{item.prize}</div>
                    </div>
                  ))}
                  <div className="glass-panel p-6 text-center mt-8">
                    <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Total Prize Pool</div>
                    <div className="text-5xl font-heading text-primary glow-text">$250,000</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rules" className="animate-fade-in-up">
              <div className="glass-panel p-8">
                <h2 className="text-3xl font-heading mb-6 glow-text">TOURNAMENT RULES</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="text-xl font-heading text-foreground mb-3">GENERAL RULES</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>All matches are Best of 3 (BO3) format</li>
                      <li>Finals are Best of 5 (BO5) format</li>
                      <li>Standard competitive ruleset applies</li>
                      <li>Teams must arrive 15 minutes before scheduled match time</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-foreground mb-3">PLAYER REQUIREMENTS</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Minimum 5 players, maximum 7 players per roster</li>
                      <li>Players must be 16 years or older</li>
                      <li>Valid identification required for all participants</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-foreground mb-3">CONDUCT</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Professional conduct expected at all times</li>
                      <li>No cheating, exploits, or unsportsmanlike behavior</li>
                      <li>Violation results in immediate disqualification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="players" className="animate-fade-in-up">
              <div className="glass-panel p-8">
                <h2 className="text-3xl font-heading mb-6 glow-text">TOP PLAYERS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topPlayers.map((player, index) => (
                    <div
                      key={player.id}
                      onClick={() => setSelectedPlayer(player)}
                      className="glass-panel glass-panel-hover p-6 cursor-pointer space-y-4 floating-card"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-5xl filter drop-shadow-lg">{player.avatar}</div>
                        <div>
                          <div className="font-heading text-xl">{player.nickname}</div>
                          <div className="text-sm text-primary glow-text">{player.team}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {player.achievements.map((ach, i) => (
                          <Badge key={i} variant="outline" className="text-xs rounded-full">
                            {ach}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="top-teams" className="animate-fade-in-up">
              <div className="glass-panel p-8">
                <h2 className="text-3xl font-heading mb-6 glow-text">TOP TEAMS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {teams.slice(0, 8).map((team, index) => (
                    <div
                      key={team.id}
                      onClick={() => setSelectedTeam(team)}
                      className="glass-panel glass-panel-hover p-6 cursor-pointer text-center space-y-4 floating-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="font-heading text-lg tracking-wider">{team.name}</div>
                      <div className="text-6xl filter drop-shadow-lg">{team.logo}</div>
                      <Badge variant="default" className="uppercase tracking-wider text-xs rounded-full shadow-lg shadow-primary/30">
                        Top {team.id}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="glass-panel border-primary/30 max-w-2xl backdrop-blur-3xl bg-background/90 animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4 text-3xl font-heading animate-fade-in-up">
              <span className="text-5xl filter drop-shadow-lg">{selectedTeam?.logo}</span>
              {selectedTeam?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>{selectedTeam?.description}</p>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-heading text-xl mb-3">PLAYERS</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTeam?.players.map((player, i) => (
                  <Badge key={i} variant="secondary" className="rounded-full">{player}</Badge>
                ))}
              </div>
            </div>
            {selectedTeam?.results && selectedTeam.results.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="font-heading text-xl mb-3">ACHIEVEMENTS</h3>
                <ul className="space-y-2">
                  {selectedTeam.results.map((result, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Trophy" className="w-4 h-4 text-primary" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedTeam?.telegram && (
              <Button asChild className="w-full glass-panel glass-panel-hover animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <a href={selectedTeam.telegram} target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" className="w-4 h-4 mr-2" />
                  Telegram Channel
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent className="glass-panel border-primary/30 backdrop-blur-3xl bg-background/90 animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4 text-3xl font-heading animate-fade-in-up">
              <span className="text-5xl filter drop-shadow-lg">{selectedPlayer?.avatar}</span>
              {selectedPlayer?.nickname}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-primary font-heading glow-text animate-fade-in-up" style={{ animationDelay: '0.1s' }}>{selectedPlayer?.team}</div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-heading text-xl mb-3">ACHIEVEMENTS</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPlayer?.achievements.map((ach, i) => (
                  <Badge key={i} variant="outline" className="rounded-full">{ach}</Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
        <DialogContent className="glass-panel border-primary/30 max-w-4xl backdrop-blur-3xl bg-background/90 animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-6 text-2xl font-heading animate-fade-in-up">
              <div className="flex items-center gap-3">
                <span className="text-4xl filter drop-shadow-lg">{selectedMatch?.logo1}</span>
                <span>{selectedMatch?.team1}</span>
              </div>
              <span className="text-primary glow-text">VS</span>
              <div className="flex items-center gap-3">
                <span>{selectedMatch?.team2}</span>
                <span className="text-4xl filter drop-shadow-lg">{selectedMatch?.logo2}</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedMatch?.status === 'LIVE' && selectedMatch.streamUrl && (
              <div className="aspect-video w-full glass-panel overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedMatch.streamUrl}
                  title="Live Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
            <div className="glass-panel p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-muted-foreground">Status</div>
                <Badge 
                  variant={selectedMatch?.status === 'LIVE' ? 'destructive' : 'secondary'}
                  className="uppercase"
                >
                  {selectedMatch?.status}
                </Badge>
              </div>
              {selectedMatch?.score && (
                <div className="flex justify-between items-center">
                  <div className="text-muted-foreground">Score</div>
                  <div className="text-2xl font-heading">{selectedMatch.score}</div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <div className="text-muted-foreground">Time</div>
                <div className="font-heading">{selectedMatch?.time}</div>
              </div>
            </div>
            {selectedMatch?.status === 'LIVE' && (
              <div className="glass-panel p-6">
                <h3 className="font-heading text-xl mb-4">LIVE CHAT</h3>
                <div className="text-center text-muted-foreground py-8">
                  <Icon name="MessageSquare" className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <p>Chat feature coming soon</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}