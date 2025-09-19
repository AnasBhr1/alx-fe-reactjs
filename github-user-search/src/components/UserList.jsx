import UserCard from './UserCard';
import './UserList.css';

const UserList = ({ users, loading, error, totalCount, searchQuery }) => {
  if (loading) {
    return (
      <div className="user-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <div className="error">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="user-list-container">
        <div className="no-results">
          {searchQuery ? (
            <>
              <h3>No users found</h3>
              <p>We couldn't find any users matching "{searchQuery}"</p>
              <p>Try searching with different keywords or check your spelling.</p>
            </>
          ) : (
            <>
              <h3>Welcome to GitHub User Search</h3>
              <p>Enter a username or keyword above to start searching for GitHub users.</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="results-header">
        <h2>
          {totalCount > 0 && (
            <>
              Found {totalCount.toLocaleString()} user{totalCount !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
            </>
          )}
        </h2>
        <p className="results-info">
          Showing {users.length} result{users.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;