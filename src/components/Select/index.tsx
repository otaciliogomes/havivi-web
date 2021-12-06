import { useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


type SelectProps = {
    setValue?: any
    label: string;
    typesValues: string[]
}

export default function SelectAutoWidth({ setValue, label, typesValues }: SelectProps) {
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
        // setValue ? setValue(event.target.value) : ""
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 80, width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={age}
                    onChange={handleChange}
                    autoWidth
                    label="Age"
                >
                    <MenuItem value="">
                        <em>{` `}</em>
                    </MenuItem>
                    {
                        typesValues.map(typeValue => (
                            <MenuItem value={typeValue}>{typeValue}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
}
