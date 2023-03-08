/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

type _base1 = keyof typeof MaterialIcons;

export type _materialIcons = Exclude<_base1,"prototype" | "_allIcons">


export class MaterialIcons {

    constructor(private _glyphId:string) {
        MaterialIcons._allIcons.push(this);
    };

    public static _allIcons: MaterialIcons[] = [];

    public get glyphId() {
        return this._glyphId;
    }

    public static readonly NavigationMenu = new MaterialIcons("menu");
    public static readonly HomeControl = new MaterialIcons("home");
    public static readonly Download = new MaterialIcons("download");
    public static readonly ArrowDownWard = new MaterialIcons("arrow_downward");
    public static readonly CheckedCheckBox = new MaterialIcons('check_box');
    public static readonly UnCheckedCheckBox = new MaterialIcons('check_box_outline_blank');
    public static readonly Delete = new MaterialIcons('delete');
    public static readonly ExpandMore = new MaterialIcons('expand_more');
    public static readonly ExpandLess = new MaterialIcons('expand_less');
    public static readonly Sync = new MaterialIcons('sync');
    public static readonly ShareControl = new MaterialIcons('share');
    public static readonly Settings = new MaterialIcons('settings');
    public static readonly Feedback = new MaterialIcons('thumb_up');
    public static readonly About = new MaterialIcons('eco');
    public static readonly CloseControl = new MaterialIcons('close');
    public static readonly TorrentClient = new MaterialIcons('cell_tower');
    public static readonly LightTheme = new MaterialIcons('clear_day');
    public static readonly DarkTheme = new MaterialIcons('bedtime');
    public static readonly IdleBackCover = new MaterialIcons('rocket_launch');
    public static readonly AddLink = new MaterialIcons('add_link');
    public static readonly AddFile = new MaterialIcons('add');
    public static readonly More = new MaterialIcons('more_horiz');
    public static readonly MultipleLinks = new MaterialIcons('chrome_tote')
};