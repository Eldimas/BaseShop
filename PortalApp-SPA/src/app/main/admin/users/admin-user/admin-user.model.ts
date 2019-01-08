import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class AdminUser
{
    id: number;
    userName: string;
    gender: string;
    dateOfBirth: string;
    knownAs: string;
    created: string;
    lastActive: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: [
        {
           'id': number, 
           'url': string,
           'description': string,
           'dateAdded': string,
           'isMain': boolean,
           'publicId': string,
           'isApproved': boolean,
           'userId': number
        }
    ];

    /**
     *
     */
    constructor(user?) {
        // console.log('user: ', user);
        
        user = user || {};
        this.id = user.id || 0;
        this.userName = user.userName || '';
        this.gender = user.gender || '';
        this.dateOfBirth = user.dateOfBirth || '';
        this.knownAs = user.knownAs || '';
        this.created = user.created || '';
        this.lastActive = user.lastActive || '';
        this.introduction = user.introduction || '';
        this.lookingFor = user.lookingFor || '';
        this.interests = user.interests || '';
        this.city = user.city || '';
        this.country = user.country || '';
        this.photos = user.photos || [];
    }

} 
