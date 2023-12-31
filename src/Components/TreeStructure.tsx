import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import NavBar from "./NavBar";
import "./style.css";

interface Department {
  department: string;
  sub_departments: string[];
}

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
 
}

const departmentData: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const TreeStructure: React.FC<Department> = () => {
  const [checked, setChecked] = React.useState<boolean[]>([false, false]);
  const [formData, setFormData] = React.useState<FormData | null>(null);

  React.useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      try {
        const parsedData: FormData = JSON.parse(storedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing formData:", error);
      }
    }
  }, []);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = Array(departmentData.length).fill(event.target.checked);
  
    setChecked(newChecked);
  };
  
  const handleChildChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newChecked = [...checked];
    newChecked[index] = event.target.checked;

    if (index < departmentData.length - 1 && event.target.checked) {
      for (let i = index + 1; i < departmentData.length; i++) {
        newChecked[i] = true;

        departmentData[i].sub_departments.forEach((subIndex) => {
 
          const numericSubIndex = parseInt(subIndex, 10);  

          if (!isNaN(numericSubIndex)) {
            newChecked[i + numericSubIndex + 1] = true;
          }
        });
      }
    }

    setChecked(newChecked);
  };

  const children = departmentData.map((department, index) => (
    <React.Fragment key={index}>
      <FormControlLabel
        label={department.department}
        control={
          <Checkbox
            checked={checked[index]}
            onChange={(event) => handleChildChange(event, index)}
          />
        }
      />
      {checked[index] && (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
          {department.sub_departments.map((subDepartment, subIndex) => (
            <FormControlLabel
              key={subIndex}
              label={subDepartment}
              control={<Checkbox />}
            />
          ))}
        </Box>
      )}
    </React.Fragment>
  ));

  return (
    <>
      <NavBar formData={formData || { name: "", phoneNumber: "", email: "" }} />
      <div className="tree_box">
         <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        ><div className="box_panal">
          <FormControlLabel
            label="Parent"
            control={
              <Checkbox
              checked={checked[0] && checked[1]}
              indeterminate={checked[0] !== checked[1]}
              onChange={handleChange1}
            />
            
            }
          />
          {children}
          </div>
        </Box>
       
      </div>
    </>
  );
};

export default TreeStructure;
