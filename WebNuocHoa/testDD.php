<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tạo mã định danh nhân viên</title>
</head>
<body>
    <h2>Tạo mã định danh nhân viên</h2>
    <form method="POST">
        <label for="birthdate">Nhập ngày sinh (ddmmyyyy):</label><br>
        <input type="text" id="birthdate" name="birthdate" required>
        <br>
        <label for="department">Nhập phòng ban:</label><br>
        <input type="text" id="department" name="department" required>
        <br>
        <input type="submit" value="Tạo mã định danh">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $birthdate_input = $_POST['birthdate'];
        $department = $_POST['department'];

        // Kiểm tra định dạng ngày sinh
        if (preg_match('/^\d{8}$/', $birthdate_input)) {
            $day = (int)substr($birthdate_input, 0, 2);
            $month = (int)substr($birthdate_input, 2, 2);
            $year = (int)substr($birthdate_input, 4, 4);

            // Kiểm tra ngày tháng hợp lệ
            if (checkdate($month, $day, $year)) {
                // Lấy 4 chữ cái đầu tiên của phòng ban
                $department_initials = strtoupper(substr($department, 0, 4));

                // Tạo mã định danh
                $employee_id = sprintf('%02d%02d%s', $day, $month, $department_initials);

                echo "<br>Mã định danh của nhân viên: $employee_id<br>";
            } else {
                echo "Ngày sinh không hợp lệ. Vui lòng kiểm tra lại.<br>";
            }
        } else {
            echo "Ngày sinh không đúng định dạng. Vui lòng nhập lại theo định dạng ddmmyyyy.<br>";
        }
    }
    ?>
</body>
</html>
