// Player-specific layout without AuthContext
export const metadata = {
  title: 'Digital Signage Player',
  description: 'Digital signage content player',
};

export default function PlayerLayout({ children }) {
  // Player page - no AuthContext, no admin app dependencies
  return (
    <div style={{ margin: 0, padding: 0 }}>
      {children}
    </div>
  );
}
