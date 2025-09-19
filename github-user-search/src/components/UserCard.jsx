import './UserCard.css';

const UserCard = ({ user }) => {
  const {
    login,
    avatar_url,
    html_url,
    type,
    name,
    company,
    location,
    bio,
    public_repos,
    followers,
    following,
  } = user;

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={avatar_url} alt={`${login}'s avatar`} />
      </div>
      
      <div className="user-info">
        <div className="user-header">
          <h3 className="user-name">{name || login}</h3>
          {name && <span className="user-login">@{login}</span>}
          <span className={`user-type ${type.toLowerCase()}`}>{type}</span>
        </div>
        
        {bio && <p className="user-bio">{bio}</p>}
        
        <div className="user-details">
          {company && (
            <div className="user-detail">
              <span className="detail-icon">🏢</span>
              <span>{company}</span>
            </div>
          )}
          {location && (
            <div className="user-detail">
              <span className="detail-icon">📍</span>
              <span>{location}</span>
            </div>
          )}
        </div>
        
        <div className="user-stats">
          <div className="stat">
            <span className="stat-number">{public_repos || 0}</span>
            <span className="stat-label">Repositories</span>
          </div>
          <div className="stat">
            <span className="stat-number">{followers || 0}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-number">{following || 0}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
        
        <div className="user-actions">
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="view-profile-btn"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;