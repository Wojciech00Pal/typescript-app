import React from 'react'
import { withAdminAuth } from '../HOC';

function AuthenticationTestAdmin() {
  return (
    <div>Page can be accessed by  logged ADMIN</div>
  );
}

export default withAdminAuth(AuthenticationTestAdmin);