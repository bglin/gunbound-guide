# gunbound-guide


![alt title](https://github.com/bglin/gunbound-guide/blob/master/home.png)
## Quick Start (MacOS)

### Prerequisites

```ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" ```
 
 ```brew update```

```brew install node```

### Backend

in a terminal window run these commands:

``` cd backend ```

```python3 -m venv venv```

``` source venv/bin/activate```

``` pip install -r requirements.txt ```

```export FLASK_ENV=development```

``` flask run ```

### Frontend

open another terminal window and run these commands: 

``` cd frontend ```

``` npm install```

``` npm start ```

access app on http://localhost:3000
