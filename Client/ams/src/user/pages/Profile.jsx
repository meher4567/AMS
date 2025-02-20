import { useEffect, useState } from 'react';
import { useUser } from '../../components/UserContext';
import { getProfile } from '../../api/registerApi'; // Assume getProfile API function
import styles from '../../styles/Profile.module.scss';
import ProfilePic from '../../assets/images/profilepic.jpg';

const Profile = () => {
    const { username } = useUser(); // Get the username from UserContext
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        membership: 'Regular', // Default to 'Regular' if not specified
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile(username); // Fetch profile details
                setProfile({
                    firstName: data.first_name || '',
                    lastName: data.last_name || '',
                    email: data.email || '',
                    membership: data.membership || 'Regular',
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (username) {
            fetchProfile();
        }
    }, [username]);

    return (
        <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
                <img
                    src={ProfilePic}
                    alt="User Profile"
                    className={styles.profileImage}
                />
                {profile.firstName || profile.lastName ? (
                    <h1 className={styles.profileName}>
                        {profile.firstName} {profile.lastName}
                    </h1>
                ) : null}
                <p className={styles.profileTagline}>
                    {profile.membership} Member
                </p>
            </div>
            <div className={styles.profileDetails}>
                <p><strong>Username:</strong> {username}</p>
                {profile.firstName && (
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                )}
                {profile.lastName && (
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                )}
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Membership:</strong> {profile.membership}</p>
            </div>
            <button className={styles.editButton}>Edit Profile</button>
        </div>
    );
};

export default Profile;
